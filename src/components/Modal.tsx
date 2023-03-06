import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Dialog } from "@headlessui/react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps): JSX.Element => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={onClose}
      >
        <div className="min-h-screen px-0.5 text-center md:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />
          </motion.div>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full transform text-left align-middle transition-all 2xl:max-w-7xl">
            <div className="group relative">
              <div className="animate-tilt absolute -inset-0.5 rotate-2 rounded-lg bg-accent shadow-md transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
              <div className="relative flex flex-col overflow-hidden rounded-2xl bg-base shadow-md md:aspect-[2/1] md:flex-row md:bg-primary">
                {children}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
};
