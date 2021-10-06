import React from "react";
import { Viewer, Entity, PlaneGraphics } from "resium";
import { Cartesian3, Plane, Cartesian2, Color } from "cesium";
// import Plane from "cesium/Source/Core/Plane";
// import Cartesian2 from "cesium/Source/Core/Cartesian2";
// import Color from "cesium/Source/Core/Color";

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const officePosition = Cartesian3.fromDegrees(30.2764209, 59.9055684, 100);
const pointGraphics = { pixelSize: 10 };

const Cesium = () => {
  return (
    <Viewer full>
      <Entity
        position={position}
        point={pointGraphics}
        description="где в США"
      />
      {/* <Entity
        position={officePosition}
        point={pointGraphics}
        description="Офис Сбера в СПб"
      /> */}
      <Entity
        position={officePosition}
        // point={pointGraphics}
        description="Офис Сбера в СПб"
      >
        <PlaneGraphics
          // plane={new Plane(Cartesian3.UNIT_Y, 10000.0)}
          plane={new Plane(Cartesian3.ONE, 100)}
          dimensions={new Cartesian2(30000, 30000)}
          fill={true}
          outline
          outlineColor={Color.RED}
        />
      </Entity>
    </Viewer>
  );
};

export default Cesium;
