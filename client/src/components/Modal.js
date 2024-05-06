import React from "react";
import PropTypes from "prop-types";
import * as S from "./ModalStyle.js";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <S.ModalWrapper onClick={onClose}>
      <S.CloseButton
        onClick={(e) => {
          console.log("Close button clicked");
          e.preventDefault();
          e.stopPropagation(); // 이벤트 전파 중지
          onClose(); // 모달 닫기 함수 실행
        }}
      >
        ×
      </S.CloseButton>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
