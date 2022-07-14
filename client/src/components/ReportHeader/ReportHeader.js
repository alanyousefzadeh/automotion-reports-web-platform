import './ReportHeader.scss';

function ReportHeader(props) {
    const {closed, endDate, startDate} = props;

    return (
        <div className="header m-2">
            <p className='header__p'>Start: {startDate} </p>
            <p className='header__p'>End: {endDate}</p>
            <p className='header__p'>Tickets: Start: 0 Issued: 0 Closed: {closed} End: 0</p>
        </div>
    );
}

export default ReportHeader;