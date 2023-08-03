import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import "../css/CertificateOfDebtComponent.css";

const blockName = "ReportBlock";

export const CertificateOfDebtComponent = ({
  address,
  name,
  account,
  disabled,
}) => {
  const [open, setOpen] = useState();

  const handleOnClickSaveBtn = () => {
    const html = document.getElementById(blockName);

    html2canvas(html, {
      dpi: 300,
      scale: 5,
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      var img = canvas.toDataURL("image/jpeg", 1);
      var doc = new jsPDF("p", "mm", [297, 210]);
      doc.addImage(img, "JPEG", 10, 20, 190, 110);
      doc.save("Справка_о_задолженности.pdf");
    });
  };

  return (
    <Modal
      trigger={
        <Button disabled={disabled} color="teal" onClick={() => setOpen(true)}>
          Получить справку
        </Button>
      }
      size={"xl"}
      open={open}
    >
      <Modal.Header>Справка о задолженности</Modal.Header>
      <Modal.Content>
        <div id={blockName} className="main p-3">
          <div className="title_container">
            <h1>Справка</h1>
          </div>
          <div className="text-center">
            <p className="m-0">
              о состоянии задолженности на{" "}
              <span className="fw-bold">
                {new Date().toLocaleDateString("Ru")}
              </span>
            </p>
            <h5 className="m-0">ЛС № {account}</h5>
          </div>
          <div className="text-center m-5">
            <p className="m-0 fs-5">
              Выдана <span className="fw-bold">{name}</span> о том, что по
              адресу <span className="fw-bold">{address}</span> в АО
              "Чеченэнерго" задолженность за электроэнергию{" "}
              <span className="fw-bold">отсутствует</span>
            </p>
          </div>
          <div className="text-center mt-5">
            <p className="fst-italic">
              Справка сформирована в электронном виде. Справка действительна без
              подписи и печати
            </p>
          </div>
          <div className="text mt-5">
            <p className="mb-0">
              Дата и время формирования:
              {new Date().toLocaleDateString("Ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
            <p>Сформирован в личном кабинете</p>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleOnClickSaveBtn}>
          Скачать
        </Button>
        <Button onClick={() => setOpen(false)}>Закрыть</Button>
      </Modal.Actions>
    </Modal>
  );
};
