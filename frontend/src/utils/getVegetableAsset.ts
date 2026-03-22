import vegetableIconsMaps from "@/maps/vegetableMaps";
import unknownVegetableIcon from "@/assets/vegetables-icons/unknown-vegetable.png";

const getVegetableAsset = (vegetableName) => {
  if (vegetableName) {
    return (
      (
        vegetableIconsMaps.filter((vegetable) => {
          return vegetable.name.fr === vegetableName.toLowerCase();
        })[0] || {}
      ).assets || unknownVegetableIcon
    );
  }
};

export default getVegetableAsset;
