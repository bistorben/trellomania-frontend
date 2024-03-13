import TeaserHome from "./TeaserHome.jsx";

const ComponentName = () => {
  console.log(import.meta.env.VITE_API);
  return (
    <>
      <TeaserHome />
    </>
  );
};

export default ComponentName;
