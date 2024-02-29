import { ThreeBasicScene } from "./libs/three"
import { useRef, useEffect } from "react"

function App() {
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const basicScene = new ThreeBasicScene(viewer)
    return () => {
      viewer.removeChild(basicScene.renderer.domElement);
    }
  }, [])

  return (
    <>
      <div id="viewer" ref={viewerRef} className="h-screen w-full"></div>
    </>
  )
}

export default App
