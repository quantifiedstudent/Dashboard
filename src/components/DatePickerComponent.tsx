import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

// Register the locale for date-fns
registerLocale("en-GB", enGB);

const halfAYearAgo = new Date();
halfAYearAgo.setMonth(halfAYearAgo.getMonth() - 6);

const DatePickerWrapper = styled.div`
  position: relative;
  margin: 0 1em;

  input {
    width: 100%;
    padding: 10px 40px 10px 10px;
    border: none;
    background: transparent;
    box-sizing: border-box;
  }

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
  }
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

type DateRangePickerProps = {
  onDateChange: (startDate: Date, endDate: Date) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const currentDate = new Date();
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const [startDate, setStartDate] = useState<Date>(lastMonth);
  const [endDate, setEndDate] = useState<Date>(currentDate);
  const [startDateError, setStartDateError] = useState<string>("");
  const [endDateError, setEndDateError] = useState<string>("");

  const handleStartDateChange = (date: Date) => {
    if (date && date.getTime() >= halfAYearAgo.getTime()) {
      setStartDate(date);
      setStartDateError("");
      if (endDateError) {
        setEndDateError("");
      }
      if (
        endDate &&
        Math.abs(endDate.getTime() - date.getTime()) <= 30 * 24 * 60 * 60 * 1000
      ) {
        onDateChange(date, endDate);
      } else {
        setEndDateError("End date should be within 30 days of the start date.");
      }
    } else {
      setStartDateError("Start date should be within the last 6 months.");
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (
      date &&
      startDate &&
      Math.abs(date.getTime() - startDate.getTime()) <= 360 * 24 * 60 * 60 * 1000
    ) {
      setEndDate(date);
      setEndDateError("");
      if (startDateError) {
        setStartDateError("");
      }
      onDateChange(startDate, date);
    } else if (date) {
      setEndDateError("End date should be within 30 days of the start date.");
    } else {
      setEndDate(date);
      setEndDateError("");
      onDateChange(startDate, date);
    }
  };

  return (
    <FlexContainer>
      <label>Start Date:</label>
      <DatePickerWrapper>
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={handleStartDateChange as any}
          maxDate={new Date()}
          locale="en-GB"
          customInput={<input />}
        />
        <FaCalendarAlt />
      </DatePickerWrapper>
      {startDateError && <ErrorMsg>{startDateError}</ErrorMsg>}
      <label>End Date:</label>
      <DatePickerWrapper>
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={handleEndDateChange as any}
          maxDate={new Date()}
          locale="en-GB"
          customInput={<input />}
        />
        <FaCalendarAlt />
      </DatePickerWrapper>
      {endDateError && <ErrorMsg>{endDateError}</ErrorMsg>}
    </FlexContainer>
  );
};

export default DateRangePicker;
