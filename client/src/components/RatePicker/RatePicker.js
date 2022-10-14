import React from 'react'

export default function RatePicker(props) {
    const {garage} = props
    return (
        <select onChange={(e) => setRate(e.target.value)}>
            <option value="25">Early Bird - $25</option>
            <option value="15">Up to 1/2 Hr - $15</option>
            <option value="25">Up to 1 - $25</option>
            <option value="32">Up to 2 - $32</option>
            <option value="42">Up to 3 - $42</option>
            <option value="46">Up to 12 - $46</option>
            <option value="45">Up to 24 - $55</option>
            {/* <option value="">Other</option> */}
        </select>
    )
}
