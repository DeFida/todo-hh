import { useRef, useState } from 'react';
import '../style/CreateCard.scss'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateCard = (props) => {

    const titleRef = useRef();
    const descriptionRef = useRef();

    const [dateTime, setDateTime] = useState();
    const [uploadedFile, setUploadedFile] = useState(null);

    function addTask(e) {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        props.addTask({ title, description, dateTime, uploadedFile })
    }

    return (
        <div className="create-card">
            <form className='form' onSubmit={addTask}>
                <h2 className='form__heading'>Добавить задачу</h2>
                <input type="text" placeholder='Заголовок' ref={titleRef} className='form__input' />
                <textarea type="text" placeholder='Описание' ref={descriptionRef} className='form__textarea' rows={3} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} sx={{
                            svg: { color: 'white' },
                            input: { color: 'white' },
                            label: { color: 'white' },
                            backgroundColor: "rgba(255, 255, 255, 0.2)"
                        }
                        }
                            className='form__datetimepicker' />}
                        value={dateTime}
                        onChange={(newValue) => {
                            setDateTime(new Date(newValue));
                        }}

                    />
                </LocalizationProvider>
                <div className='form__wrapper'>
                    <label htmlFor="filit" className='form__label_file'>Прикрепите файл</label>
                    <input type="file" name='filit' id='filit' className='form__input form__input_file' onChange={(e) => setUploadedFile(e.target.files[0])} />
                </div>
                {uploadedFile && <p className='form__uploadedFile'><span style={{ color: "#FFCA26" }}>{uploadedFile.name}</span> был прикреплен</p>}
                <button type='submit' className='form__submit'>Добавить</button>

            </form>
        </div>
    )
}

export default CreateCard;