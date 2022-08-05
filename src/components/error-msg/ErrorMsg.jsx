import { motion } from "framer-motion";
import {VARIANTS_MANAGER} from '/src/setup/variants-manager'


const ErrorMsg = ({ img, msg, subMsg, addClass }) => {
  return (
  	 <motion.div
          className={`${addClass} flex flex-col gap-4 items-center justify-center w-full p-4`}
          variants={VARIANTS_MANAGER}
          initial="pop-out"
          animate="pop-in"
          exit="pop-out"
        >
          <img src={img} className="w-full md:w-96" />
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-black dark:text-white text-2xl max-w-md ">
              {msg}
            </h1>
            <p className="text-muted-light dark:text-muted-dark text-sm ">
              {subMsg}
            </p>
          </div>
        </motion.div>
  	);
};

export default ErrorMsg;
