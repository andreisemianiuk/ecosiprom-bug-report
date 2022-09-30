import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { Map, Placemark, YMaps } from "react-yandex-maps";

const YandexMap = () => {
  const position = [53.901637, 27.516287];
  const isNotDesktop = useMediaQuery({ maxWidth: 1223 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const width = isNotDesktop || isMobile ? (672 ? isTabletOrMobile : 500) : 872;
  const height = isNotDesktop ? 380 : 480;

  return (
    <YMaps>
      <Map
        width={width}
        height={height}
        defaultState={{
          center: position,
          zoom: 16,
        }}>
        <Placemark
          geometry={position}
          options={{
            preset: "islands#dotIcon",
            iconColor: " #0E6683",
          }}
          properties={{ iconCaption: "ул. Гусовского, 4" }}
        />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
