import React, { useEffect } from 'react';
import styled from 'styled-components';
import useGetAlarmList from '../../../query/get/useGetAlarmList';
import { useSelectedUsers } from '../SelectedUserContext';

function TableAlarmList() {
    const {
        selectedUserEmails,
        setSelectedUserEmails,
        selectAll,
        setSelectAll,
    } = useSelectedUsers();
    const { data } = useGetAlarmList({ ordinal: 12 });

    useEffect(() => {
        if (selectAll && data) {
            setSelectedUserEmails(data.alarms.map(recruit => recruit.email));
        } else if (!selectAll) {
            setSelectedUserEmails([]);
        }
    }, [selectAll, data, setSelectedUserEmails]);

    const handleCheckboxChange = (recruitEmail: string, isChecked: boolean) => {
        if (selectAll) {
            setSelectAll(false);
        }
        setSelectedUserEmails(prev =>
            isChecked
                ? [...prev, recruitEmail]
                : prev.filter(email => email !== recruitEmail),
        );
    };

    return (
        <Wrapper>
            {data &&
                data.alarms.map((recruit, index) => (
                    <TableBody key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Table className="check">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedUserEmails.includes(
                                            recruit.email,
                                        ) || selectAll
                                    }
                                    onChange={e =>
                                        handleCheckboxChange(
                                            recruit.email,
                                            e.target.checked,
                                        )
                                    }
                                />
                            </Table>
                            <Table className="ordinal">{recruit.ordinal}</Table>
                            <Table className="email">{recruit.email}</Table>
                        </div>
                        <Table className="createdDate">
                            {recruit.createdDate}
                        </Table>
                    </TableBody>
                ))}
        </Wrapper>
    );
}

export default TableAlarmList;

const Wrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    max-height: 1660px;

    .check {
        margin-right: 20px;
        height: 24px;
        accent-color: #ff7710;
        color: #ffffff;
    }

    .ordinal {
        margin-right: 30px;
        height: 24px;
    }

    .email {
        width: 120px;
        height: 24px;
    }

    .createdDate {
        width: 120px;
    }
`;

const TableBody = styled.div`
    display: flex;
    border-bottom: 1px solid #dcdfe3;
    align-items: center;
    padding: 5px 0;
    justify-content: space-between;
`;

const Table = styled.div`
    padding: 4px 4px;
    //margin-bottom: 15px;
`;
