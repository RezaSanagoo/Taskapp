import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function CustomFileInput({ onChange }) {
  const fileInputRef = useRef(null);

  const { t } = useTranslation();
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        onChange={onChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <motion.button  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{duration: 0.25,}} onClick={handleClick} className="btn inSettingsBtn">
      {t('import')}
      </motion.button>
    </>
  );
}
