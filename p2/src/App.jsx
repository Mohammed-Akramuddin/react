import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8); // <-- use state to control the slider
  const [na,sna]=useState(false);
  const [ca,sca]=useState(false);
  const [pass,sp]=useState('');
  let gp=useCallback(()=>{
    let d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let ni="0123456789";
    let ci="!@#$%^&*()_+";
    if(na){
      d+=ni;
    }
    if(ca){
      d+=ci;
    }
    let ans="";
    for(let i=0;i<length;i++){
      const char = Math.floor(Math.random() * d.length);
      ans+=d.charAt(char);
    }
     updateStrength(ans);
    sp(ans);
  },[length,na,ca])
  useEffect(()=>{
    gp();
  },[length,na,ca])
  let z=()=>{
    window.navigator.clipboard.writeText(pass);
  }
      function updateStrength(password) {
      // Base strength starts at 0 (out of 100)
      let strength = 0;
      
      // Length factor (up to 40 points)
      strength += Math.min(40, (password.length / 20) * 40);
      
      // Character variety (up to 60 points)
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);
      
      if (hasLower) strength += 15;
      if (hasUpper) strength += 15;
      if (hasNumber) strength += 15;
      if (hasSpecial) strength += 15;
      
      strength = Math.min(100, strength);
      
      // Update UI
      strengthFill.style.width = `${strength}%`;
      
      if (strength < 30) {
        strengthFill.className = 'strength-fill weak';
        strengthText.textContent = 'Weak';
      } else if (strength < 60) {
        strengthFill.className = 'strength-fill medium';
        strengthText.textContent = 'Medium';
      } else if (strength < 80) {
        strengthFill.className = 'strength-fill strong';
        strengthText.textContent = 'Strong';
      } else {
        strengthFill.className = 'strength-fill very-strong';
        strengthText.textContent = 'Very Strong';
      }
    }
  return (
  <div className="container">
    <div className="password-box">
      <h1>Password Generator</h1>
      
      <div className="password-display">
        <input type="text" id="passwordOutput" value={pass}/>
        <button id="copyBtn" className="copy-btn" onClick={z}>
          <span className="copy-icon"></span>
          <span className="tooltip" id="copyTooltip">Copy</span>
        </button>
      </div>
      
      <div className="strength-meter">
        <div className="strength-label">
          <span>Strength</span>
          <span id="strengthText">Medium</span>
        </div>
        <div className="strength-bar">
          <div className="strength-fill" id="strengthFill"></div>
        </div>
      </div>
      
      <div className="options">
        <div className="length-option">
          <div className="length-header">
            <label htmlFor="lengthRange" className="slider-label">Length</label>
            <span id="lengthValue" className="length-value">{length}</span>
          </div>
          <input type="range" className="length-slider" min={4} max={20} id="lengthRange" value={length} onChange={(e)=>setLength(e.target.value)}/>
          <div className="length-marks">
            <span>4</span>
            <span>12</span>
            <span>20</span>
          </div>
        </div>
        
        <div className="checkbox-options">
          <div className="checkbox-container">
            <input type="checkbox" id="includeNumbers" className="custom-checkbox" defaultChecked={na} onChange={(e) => sna(e.target.checked)}
/>
            <label htmlFor="includeNumbers" className="checkbox-label">
              <div className="checkbox-control">
                <div className="checkbox-icon"></div>
              </div>
              <span>Include Numbers</span>
            </label>
          </div>
          
          <div className="checkbox-container">
            <input type="checkbox" id="includeSpecial" className="custom-checkbox" defaultChecked={ca} onChange={(e)=>sca(e.target.checked)}/>
            <label htmlFor="includeSpecial" className="checkbox-label">
              <div className="checkbox-control">
                <div className="checkbox-icon"></div>
              </div>
              <span>Include Special Characters</span>
            </label>
          </div>
        </div>
        <button id="generateBtn" className="generate-btn">Generate Password</button>
      </div>
    </div>
  </div>
  )
}

export default App
