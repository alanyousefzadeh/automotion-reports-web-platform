import React from 'react'
import './RatePicker.scss'
export default function RatePicker(props) {
    const { garage, setRate } = props
    return (
        <div className='ratePicker'>
            {garage === "Baxter" ?
                <select onChange={(e) => setRate(e.target.value)}>
                    <option value="">--</option>
                    <option value="25">Early Bird - $25</option>
                    <option value="15">Up to 1/2 Hr - $15</option>
                    <option value="25">Up to 1 Hr - $25</option>
                    <option value="32">Up to 2 Hr- $32</option>
                    <option value="42">Up to 3 Hr- $42</option>
                    <option value="46">Up to 12 Hr - $46</option>
                    <option value="45">Up to 24 Hr- $55</option>
                    <option value="Other">Other</option>
                </select> :
                garage === "VanVorst" ?
                    <select onChange={(e) => setRate(e.target.value)}>
                        <option value="">--</option>
                        <option value="3.56">Up to 1/2 Hr - $3.56</option>
                        <option value="10.67">Up to 1 Hr - $10.67</option>
                        <option value="13.04">Up to 2 Hr - $13.04</option>
                        <option value="17.78">Up to 3 Hr - $17.78</option>
                        <option value="20.15">Up to 12 Hr - $20.15</option>
                        <option value="28.44">Up to 24 Hr - $28.44</option>
                        <option value="Other">Other</option>
                    </select> :
                    <select onChange={(e) => setRate(e.target.value)}>
                        <option value="">--</option>
                        <option value="15">Early Bird - $15</option>
                        <option value="5">Up to 1/2 Hr - $5</option>
                        <option value="15">Up to 2 Hr - $15</option>
                        <option value="20">Up to 3 Hr - $20</option>
                        <option value="25">Up to 8 Hr - $25</option>
                        <option value="35">Up to 24 Hr - $5</option>
                        <option value="Other">Other</option>
                    </select>

            }
        </div>
    )
}
