import React, { useState } from 'react';

function CheckRoom() {
    const [isRoomChecked, setIsRoomChecked] = useState(false);

    const handleCheckRoom = () => {
        setIsRoomChecked(!isRoomChecked);
    };

    return (
        <div>
            <h1>Check Room</h1>
            <label htmlFor="room">Room:</label>
            <input type="text" id="room" name="room" />
            <button onClick={handleCheckRoom}>
                {isRoomChecked ? 'Room is Checked' : 'Check Room'}
            </button>
        </div>
        
    );
}

export default CheckRoom;
