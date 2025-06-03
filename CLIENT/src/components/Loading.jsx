import { RotatingLines } from 'react-loader-spinner'
 const Loading=()=>{
    return( <RotatingLines
              visible={true}
              height="64"
              width="64"
              strokeColor="blue"
              strokeWidth="4"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />)
}
export default Loading