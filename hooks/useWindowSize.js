import { useState, useEffect } from "react";

export default function useWindowSize() {
  //estado el cual guarda el ancho y alto de la pantalla, con el fin de hacer responsive los productos
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    //evento que detecta un cambio en el tamaño de pantalla para ejecutar la funcion
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
