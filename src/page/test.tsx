import React, { useState } from 'react';

function MyComponent() {
    const [list, setList] = useState([
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' }
    ]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        setSelectedItem(item);
    };

    const handleChange = (event) => {
        const newText = event.target.value;
        setList(prevList => {
            return prevList.map(item => {
                if (item.id === selectedItem.id) {
                    return { ...item, text: newText };
                }
                return item;
            });
        });
    };

    return (
        <div>
            <ul>
                {list.map(item => (
                    <li key={item.id} onClick={() => handleClick(item)}>
                        {selectedItem && selectedItem.id === item.id ? (
                            <input type="text" value={item.text} onChange={handleChange} />
                        ) : (
                            item.text
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;
