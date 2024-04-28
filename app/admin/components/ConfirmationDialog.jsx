export default function ConfirmationDialog({ dialogTitle, labelFirstButton, labelSecondButton, handleClickFirst, handleClickSecond, darkMode }) {
    // console.log('ConfirmationDialog rendered');
    // console.log('dialogTitle', dialogTitle);
    // console.log('labelFirstButton', labelFirstButton);
    // console.log('labelSecondButton', labelSecondButton);
    // console.log('handleClickFirst', handleClickFirst);
    // console.log('handleClickSecond', handleClickSecond);
    // console.log('darkMode', darkMode);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className={`${darkMode ? 'bg-black' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
                <p className="text-lg font-semibold mb-4"> {dialogTitle}</p>
                <div className="flex justify-center">
                    <button
                        onClick={handleClickFirst}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                        {labelFirstButton}
                    </button>
                    <button
                        onClick={handleClickSecond}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        {labelSecondButton}
                    </button>
                </div>
            </div>
        </div>);
}