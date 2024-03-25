import "./WorkSpace.css";
import { IoMdInformationCircleOutline } from "react-icons/io";

const WorkSpace = () => {
  return (
    <aside className="WorkSpace">
      <section className="container-status">
        <IoMdInformationCircleOutline id="info-icon" />
        <p>
          We are currently working on implementing the drag and drop logic.
          Therefore, please note that it is not yet fully functional - bug-free.
        </p>
      </section>
    </aside>
  );
};

export default WorkSpace;
