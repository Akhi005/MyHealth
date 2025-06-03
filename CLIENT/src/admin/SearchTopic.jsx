import React, { useState, useMemo } from 'react'
import axios from 'axios'
import '../styles/Home.css'
import { doc, getDoc } from 'firebase/firestore'
import { db1 } from './../firebase.config'
import { useNavigate, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'

const SearchResults = () => {
  const location = useLocation()
  const { syllabus, topic } = location.state || {}

  const navigate = useNavigate()

  const sanitizeTopic = (raw) =>
    raw
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')

  const fetchArticleFromFirebase = async (topic, articleTitle, contentOwner) => {
    try {
      const sanitizedTopic = sanitizeTopic(topic)
      const docRef = doc(db1, 'articles', sanitizedTopic)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const content = docSnap.data().content
        const result = content[`${contentOwner}Content`]
        const matchedArticle = result.find((item) => item.title === articleTitle)
        return matchedArticle || null
      } else {
        console.log('No such document!')
        return null
      }
    } catch (error) {
      console.error('Error fetching article from Firebase:', error)
      return null
    }
  }

  const handleTest = async (articleTitle, contentOwner) => {
    try {
      const content = await fetchArticleFromFirebase(topic, articleTitle, contentOwner)
      if (content) {
        let contentText = contentOwner === 'wikipedia' ? content.content : content.summary
        const response = await axios.post('https://myhealth-server-side.vercel.app/generate-questions', {
          content: contentText,
        })
        const questionArray = response.data.questions.split('\n').filter((q) => q.trim() !== '')
        navigate('/questions', {
          state: { questions: questionArray, title: articleTitle },
        })
      }
    } catch (error) {
      console.error('Error generating questions:', error)
      alert('Failed to generate questions. Please try again.')
    }
  }

  const filterArticles = (articles) =>
    articles.filter((article) => {
      const articleDescription = article.description?.toLowerCase() || ''
      const tokens = topic?.toLowerCase().split(' ')
      const matchesTitle = tokens.every((token) => article.title?.toLowerCase().includes(token))
      const matchesDescription = tokens.every((token) => articleDescription.includes(token))
      return matchesTitle || matchesDescription
    })

  const filteredWikipediaArticles = useMemo(() => {
    return syllabus?.wikipediaContent ? filterArticles(syllabus.wikipediaContent) : []
  }, [syllabus, topic])

  const filteredMDNArticles = useMemo(() => {
    return syllabus?.MDNContent ? filterArticles(syllabus.MDNContent) : []
  }, [syllabus, topic])

  return (
    <div>
      {syllabus && (
        <>
          <h2 className="my-4 font-bold text-3xl text-center">Wikipedia Articles</h2>
          {filteredWikipediaArticles.length > 0 ? (
            <div>
              <ul className="px-2 flex flex-wrap">
                {filteredWikipediaArticles.map((article) => (
                  <div key={article.pageid} className="my-3 relative">
                    <li className="text-2xl bg-blue-900 text-white mx-3 w-[400px] h-[150px] flex items-center justify-center rounded-xl">
                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-title h-[70px]"
                      >
                        {article.title}
                      </a>
                    </li>
                    <button
                      className="absolute bg-orange-300 bottom-1 right-1 p-2 rounded text-xl"
                      onClick={() => handleTest(article.title, 'wikipedia')}
                    >
                      Generate Q/A
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p className="ml-5 text-red-500">No Wikipedia data found</p>
          )}
          <h2 className="my-4 font-bold text-3xl text-center">MDN Articles</h2>
          {filteredMDNArticles.length > 0 ? (
            <div>
              <ul className="flex flex-wrap px-2">
                {filteredMDNArticles.map((doc) => (
                  <div key={doc.slug} className="relative">
                    <li className="h-[120px] text-xl bg-gradient-to-r from-sky-400 to-indigo-400 mx-3 p-3 w-[220px] text-center my-5 rounded border">
                      <a
                        className="card-title"
                        href={`https://developer.mozilla.org${doc.mdn_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.title}
                      </a>
                    </li>
                    <button
                      className="absolute bottom-1 right-1 p-2 rounded bg-orange-300 text-md"
                      onClick={() => handleTest(doc.title, 'MDN')}
                    >
                      Generate Q/A
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p className="ml-5 text-xl text-red-500">No MDN data found</p>
          )}
          <h2 className="my-4 font-bold text-3xl text-center">YouTube Videos</h2>
          {Array.isArray(syllabus.youtubeContent) && syllabus.youtubeContent.length > 0 ? (
            <div>
              <ul className="flex flex-wrap w-full justify-start px-2">
                {syllabus.youtubeContent.map((video) => (
                  <li key={video.id.videoId} className="bg-blue-900 mx-3 w-[400px] h-[350px] text-center my-5 rounded-xl">
                    <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                      <img
                        className="w-[400px] h-[220px] rounded-t-xl"
                        src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                      />
                      <p className="p-2 mt-2 font-semibold text-2xl text-white">{video.snippet.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="ml-5 text-red-500">No YouTube videos found</p>
          )}
        </>
      )}
    </div>
  )
}

export default SearchResults
