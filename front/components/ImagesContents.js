import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Icon from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const ImagesContents = ({ v }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  return (
    <>
      {v.board_file3 && v.board_file2 && v.board_file1 ? (
        <>
          <div>
            <img
              src={`https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.board_file1}`}
              width="50%"
              onClick={onZoom}
            />
            <div
              style={{
                display: "inline-block",
                width: "50%",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <Icon type="plus" />
              <br />
              <strong>2개의 사진 더보기</strong>
            </div>
          </div>
          {showImagesZoom && <ImagesZoom images={v} onClose={onClose} />}
        </>
      ) : v.board_file2 && v.board_file1 ? (
        <>
          <div>
            <img
              src={`https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.board_file1}`}
              width="50%"
              onClick={onZoom}
            />
            <img
              src={`https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.board_file2}`}
              width="50%"
              onClick={onZoom}
            />
          </div>
          {showImagesZoom && <ImagesZoom images={v} onClose={onClose} />}
        </>
      ) : v.board_file1 ? (
        <div style={{ width: "100%" }}>
          <img
            src={`https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.board_file1}`}
            width="100%"
            onClick={onZoom}
          />
          {showImagesZoom && <ImagesZoom images={v} onClose={onClose} />}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

// ImagesContents.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.shape({
//     src: PropTypes.string,
//   })).isRequired,
// };

export default ImagesContents;
