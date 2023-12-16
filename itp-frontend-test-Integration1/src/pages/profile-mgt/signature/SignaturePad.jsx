import React, { useState } from "react";
import SignatureCanvas from 'react-signature-canvas';

function SignaturePad() {
    const [sign, setSign] = useState()
    const [url, setUrl] = useState()

    const handleClear = () => {
        sign.clear()
        setUrl('')
    }
    const handleGenerate = () => {
        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div style={{ border: '2px solid black', width: 1000, height: 300 }}>
                    <SignatureCanvas
                        canvasProps={{ width: 800, height: 300, className: 'sigCanvas' }}
                        ref={(data) => setSign(data)}
                    />
                </div>
            </div>


            <br></br>
            <div>
                <button
                    onClick={handleClear}
                    style={{
                        fontSize: '18px',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        transition: 'background-color 0.3s ease',
                        marginLeft: '750px', 
                        marginRight: '70px', 
                        alignItems : 'center', 
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = 'red';
                        e.target.style.borderColor = 'red';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'red';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = 'transparent';
                    }}
                >
                    Clear
                </button>

                <button
                    onClick={handleGenerate}
                    style={{
                        fontSize: '18px',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        transition: 'background-color 0.3s ease',
                        marginLeft: 'auto',
                        marginRight: '70px',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = 'red';
                        e.target.style.borderColor = 'red';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'red';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = 'transparent';
                    }}
                >
                    Save
                </button>
            </div>

            <br /><br />
            <img src={url} />
        </div>
    )
}
export default SignaturePad;