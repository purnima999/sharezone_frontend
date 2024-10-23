import React from 'react';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOrPdfExpend } from '../../../store/EducationaChatBot/slice';
import { loginRoles } from '../../../_mock/internalJsControl';

const EducationalBotHTMLcontent = ({ props }) => {
  const dispatch = useDispatch();
  let { content, citationLink, isCurrentLoadingIndex } = props;

  const getProfileDetails = useSelector((state) => (state?.utilityCallFunctionSlice?.getProfileDetails));

  // Create the HTML content with the PDF names inside an ordered list
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <div class="scoped-content">
        <style>
          .scoped-content body {
            font-family: Poppins;
            font-size: 13px;
            line-height: 1.8;
          }
          .scoped-content ol {
            margin-top: 5px;
          }
          .scoped-content ol li {
            margin-bottom: 6px;
          }
          .scoped-content ul {
            margin-top: 5px;
            padding-left: 20px;
            margin-bottom: 25px;
          }
          .scoped-content ul li {
            list-style-type: disc;
            margin-bottom: 6px;
          }
          .scoped-content p {
            font-size: 13px;
          }
          .scoped-content h1,
          .scoped-content h2,
          .scoped-content h3,
          .scoped-content h4,
          .scoped-content h5,
          .scoped-content h6 {
            font-size: 13.5px;
          }
        </style>
        <body>
          <div>
            ${content}
          </div>
        </body>
      </div>
    </html>
  `;

  // Sanitize the generated HTML to avoid XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  const pdfViewerOpenHandle = (pdfReferenceLink) => {
    dispatch(setMenuOrPdfExpend({ isPdfViewExpand: true, pdfReferenceLink }))
  }

  return (
    // <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    <>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

      {/* Loding before citation */}
      {isCurrentLoadingIndex && <div className="al_chatloading my-1"></div>}

      {/* PDF LINK  */}
      {getProfileDetails?.role_id == loginRoles.ADMIN && citationLink && Object.keys(citationLink)?.length > 0 && <div style={{ paddingTop: "10px" }}>
        <strong>Citation/Reference: </strong>
        <ol className='ps-0'>
          {Object.keys(citationLink)?.map((pdfName, index) => (
            <>
              <li className='al_text_link d-table mt-1 al_pdflink' key={index} onClick={() => pdfViewerOpenHandle(citationLink[pdfName])}><i className='icon_alfred_document me-2'></i>{pdfName}</li>
            </>
          ))}
        </ol>
      </div>}
    </>
  );
};

export default EducationalBotHTMLcontent;
