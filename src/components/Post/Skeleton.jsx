import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={1.5}
    width={900}
    height={760}
    viewBox="0 0 900 760"
    backgroundColor="#f3f3f3"
    foregroundColor="#cecece"
  >
    <rect x="0" y="0" rx="2" ry="2" width="900" height="350" />
    <circle cx="21" cy="380" r="20" /> 
    <rect x="46" y="365" rx="2" ry="2" width="140" height="10" /> 
    <rect x="46" y="385" rx="2" ry="2" width="140" height="10" /> 
    <rect x="46" y="415" rx="2" ry="2" width="854" height="216" />
  </ContentLoader>
)

export default Skeleton