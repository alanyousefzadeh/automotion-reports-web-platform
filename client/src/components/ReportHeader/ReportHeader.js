import './ReportHeader.scss';

function ReportHeader(props) {
    const {start, closed, endDate, startDate} = props;
    return (
        <div className="header m-2">
            <p className='header__p'>Start: {startDate} </p>
            <p className='header__p'>End: {endDate}</p>
            <p className='header__p'>Tickets: Closed: {closed} Issued: {closed-start} Balance: {start} </p>
        </div>
    );
}

export default ReportHeader;