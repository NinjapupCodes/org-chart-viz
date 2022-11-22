import { ProvidedZoom } from "@visx/zoom/lib/types.d";
import { useEffect } from "react";
import { useSpring } from "framer-motion";
import { springConfig } from "../../hooks/utils";

type Point = {
  x: number;
  y: number;
};
const ZoomReaction = ({
  zoom,
  centeredAt,
  origin,
}: {
  zoom: ProvidedZoom<SVGSVGElement>;
  centeredAt: Point;
  origin: Point;
}) => {
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  let coX = -centeredAt.x + origin.x;
  let coY = -centeredAt.y + origin.y;

  useEffect(() => {
    x.set(coX);
    y.set(coY);
  }, [coX, coY, x, y]);

  useEffect(() => {
    const unsub = x.onChange((point) => {
      zoom.setTranslate({
        translateX: point,
        translateY: y.get(),
      });
    });
    const unsub2 = y.onChange((point) => {
      zoom.setTranslate({
        translateX: x.get(),
        translateY: point,
      });
    });

    return () => {
      unsub();
      unsub2();
    };
  }, []);

  return null;
};

export default ZoomReaction;
