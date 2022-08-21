import * as React from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";

const YandexMap = () => {
  const position = [53.901637, 27.516287];
  return (
    <YMaps>
      <Map
        width={872}
        height={480}
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
