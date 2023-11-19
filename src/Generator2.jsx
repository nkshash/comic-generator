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

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles

const MySwal = withReactContent(Swal);

// Apply custom dark theme styles
document.documentElement.style.setProperty('--sweetalert2-bg', '#2d2d2d');
document.documentElement.style.setProperty('--sweetalert2-border-color', '#333');
document.documentElement.style.setProperty('--sweetalert2-box-shadow', '0 0 10px rgba(0, 0, 0, 0.5)');
document.documentElement.style.setProperty('--sweetalert2-text-color', '#fff');
document.documentElement.style.setProperty('--sweetalert2-button-bg', '#444');
document.documentElement.style.setProperty('--sweetalert2-button-text-color', '#fff');
document.documentElement.style.setProperty('--sweetalert2-button-hover-bg', '#555');
// Apply a dark theme
// Swal.setDefaults({
//   theme: 'dark',
//   // Additional customization options can be added here
// });
import './Generator.css';
const Generator2 = () => {
  const [panelTexts, setPanelTexts] = useState(Array(10).fill(''));
  const [panelImages, setPanelImages] = useState(Array(10).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    const handleGenerateImages = async () => {
      const isAllTextFilled = panelTexts.every((text) => text.trim() !== '');
  
      if (!isAllTextFilled) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill in all textboxes before generating images.',
        });
        setIsLoading(false);
        return;
      }
  
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
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error generating images: ' + error.message,
        });
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
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error generating and downloading image: ' + error.message,
      });
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
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'URL copied to clipboard!',
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cloudinary failed to upload image: ' + response.statusText,
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error generating and uploading image: ' + error.message,
      });
    } finally {
      setIsCopying(false);
    }
  };
  
  return (
    <div style={{ backgroundColor: 'black', padding: '5px', alignItems: 'center' }}>
  <Container className="text-center">
    <h1 style={{ color: 'white', fontSize: '30px', margin: '0 auto' }}>Comic Panel Generator</h1>
    <br />
    <Row>
      {/* Text Input Section */}
      <Col xs={12} lg={6} className="mb-4 mb-lg-0">
        {panelTexts.map((text, index) => (
          <div key={index} className="mb-3">
            <textarea
              value={text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              placeholder={`Enter text for Panel ${index + 1}`}
              className={`form-control custom-text-input ${
                text.trim() !== '' ? 'active' : 'inactive'
              }`}
            />
          </div>
        ))}
        <Button
          variant="primary"
          type="button"
          onClick={() => setIsLoading(true)}
          disabled={isLoading}
          style={{ marginTop: '10px' }}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Generate Comic Strip'}
        </Button>
      </Col>

      {/* Image Generator Section */}
      <Col xs={12} lg={6}>
  <Card style={{ borderColor: 'white', boxShadow: '0 0 0 2px white' ,background:'black',}}>
    <Card.Header className="d-flex justify-content-between align-items-center" style={{ color: 'white' }} >
      <span style={{fontColor:"white"}}>Generated Comic Strip</span>
      <span>
        <Button variant="outline-light" style={{ padding: '3px 5px' }}>
          <FontAwesomeIcon icon={faDownload} onClick={handleDownloadButtonClick} />
        </Button>
        &nbsp;
        <Button
          variant="outline-light"
          style={{ padding: '3px 5px' }}
          onClick={handleShareButtonClick}
          disabled={isCopying}
        >
          {isCopying ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon icon={faShare} />}
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
      </Card.Body>
    </div>
  </Card>
</Col>

    </Row>
  </Container>
</div>


  );
};
export default Generator2;
