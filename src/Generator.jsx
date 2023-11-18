import React, { useState, useEffect ,useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ComicPanel from './ComicPanel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
const Generator = () => {
  const [panelTexts, setPanelTexts] = useState(Array(10).fill(''));
  const [panelImages, setPanelImages] = useState(Array(10).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    const handleGenerateImages = async () => {
      setIsLoading(true);
      try {
        const imagePromises = panelTexts.map(async (text) => {
          const response = await query({ "inputs": text });
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const images = await Promise.all(imagePromises);
        setPanelImages(images);
      } catch (error) {
        console.error("Error generating images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      handleGenerateImages();
    }
  }, [isLoading, panelTexts]);

  const query = async (data) => {
    try {
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            "Accept": "image/png",
            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return response;
    } catch (error) {
      throw new Error(`Error in API request: ${error.message}`);
    }
  };
  const handleDownloadButtonClick = async () => {
    try {
      const canvas = await html2canvas(cardRef.current);
  
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');
  
      // Trigger download
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'canvas_image.png';
      a.click();
    } catch (error) {
      console.error('Error generating and downloading image:', error);
    }
  }
  const handleTextChange = (index, newText) => {
    const updatedTexts = [...panelTexts];
    updatedTexts[index] = newText;
    setPanelTexts(updatedTexts);
  };
  const cardRef = useRef(null);

  const handleShareButtonClick = async () => {
    try {
      setIsCopying(true); // Start the loading state

      const canvas = await html2canvas(cardRef.current);
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', dataUrl);
      formData.append('upload_preset', 'comic_image');

      const response = await fetch(`https://api.cloudinary.com/v1_1/dmfefsk4z/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const cloudinaryUrl = result.secure_url;
        console.log('Cloudinary URL:', cloudinaryUrl);
        await navigator.clipboard.writeText(cloudinaryUrl);
        console.log('URL copied to clipboard');
        alert('URL copied to clipboard!');
      } else {
        console.error('Cloudinary failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating and uploading image:', error);
    } finally {
      setIsCopying(false); 
    }
  };
  
  return (
    <div>
  
  <Container>
    <Row>
      {/* Text Input Section */}
      
      <Col xs={12} lg={6} className="mb-4 mb-lg-0">
        {panelTexts.map((text, index) => (
          <div key={index} className="mb-3">
            <textarea
              value={text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              placeholder={`Enter text for Panel ${index + 1}`}
              className="form-control"
            />
          </div>
        ))}
      </Col>
      

      {/* Image Generator Section */}
      <Col >
      <Button variant="primary" type="button" onClick={() => setIsLoading(true)} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Generate Comic Strip'}
        </Button> <br/><br/>
        <Card >
        <Card.Header className="d-flex justify-content-between align-items-center">
    Generated Comic Strip
    <span>
      <Button variant="outline-primary" style={{ padding: "3px 5px" }}> <FontAwesomeIcon icon={faDownload} onClick={handleDownloadButtonClick}/></Button>
      &nbsp; <Button
        variant="outline-primary"
        style={{ padding: "3px 5px" }}
        onClick={handleShareButtonClick}
        disabled={isCopying}
      >
        {isCopying ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faShare} />
        )}
      </Button>
    </span>
  </Card.Header>
  <div id="comic-strip-container">
          <Card.Body style={{ margin: 0, padding: 0 }} ref={cardRef}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <Row key={rowIndex} style={{ margin: 0, padding: 0 }}>
                {Array.from({ length: rowIndex < 2 ? 3 : 2 }).map((_, colIndex) => {
                  const panelIndex = rowIndex < 2 ? rowIndex * 3 + colIndex : 6 + (rowIndex - 2) * 2 + colIndex;
                  return (
                    <Col key={colIndex} style={{ margin: 0, padding: 0 }}>
                      <ComicPanel
                        image={panelImages[panelIndex]}
                        altText={`Generated Image ${panelIndex + 1}`}
                        panelText={panelTexts[panelIndex]}
                      />
                    </Col>
                  );
                })}
              </Row>
            ))}
          </Card.Body></div>
        </Card>
      </Col>
    </Row>
    
  </Container>
</div>

  );
};
export default Generator;