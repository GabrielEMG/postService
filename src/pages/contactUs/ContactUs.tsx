import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { firebase } from "../../firebase";
import PaperBG from "../../components/paperBG";
import gmail from "./gmail";
import github from "./GitHub_logo.png";
import linkedin from "./linkeding.png";
import cv from "./cv.png";
import "./cv.css";

export default (): JSX.Element => {
  const [doc, setDoc] = React.useState<string>("");
  React.useEffect(() => {
    const setDownloadableLink = async () => {
      const ddoc = await firebase
        .storage()
        .refFromURL("gs://survey-realtime.appspot.com/GabrielMolinaCV.pdf")
        .getDownloadURL();
      setDoc(ddoc);
    };
    setDownloadableLink();
  }, []);
  console.log(doc);

  return (
    <Container>
      <Col>
        <PaperBG>
          <Col>
            <Row className="justify-content-center py-4">
              <h4>Contactame!</h4>
            </Row>
            <Col>
              <Row className="justify-content-center">
                <div>
                  <Row className="py-2">
                    {gmail}

                    <a
                      href="mailto:ge.molinagutierrez@gmail.com"
                      style={{ marginLeft: 6 }}
                    >
                      ge.molinagutierrez@gmail.com
                    </a>
                  </Row>
                  <Row>
                    <img src={github} style={{ height: 20 }} />
                    <a
                      style={{ marginLeft: 6 }}
                      href="http://github.com/GabrielEMG/postService"
                    >
                      http://github.com/GabrielEMG/postService
                    </a>
                  </Row>
                  <Row className="py-2">
                    <img src={linkedin} style={{ height: 20 }} />
                    <a
                      style={{ marginLeft: 6 }}
                      href="https://www.linkedin.com/in/gabriel-eduardo-molina-guti%C3%A9rrez-baaa35173/"
                    >
                      https://www.linkedin.com/in/gabriel-eduardo-molina-gutierrez
                    </a>
                  </Row>
                  <Row className="justify-content-center py-4">
                    <a href={doc} className="cv">
                      <img src={cv} style={{ height: 50 }} />
                    </a>
                  </Row>
                </div>
              </Row>
            </Col>
          </Col>
        </PaperBG>
      </Col>
    </Container>
  );
};
