import React from 'react';
import style from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    };

    editModeOn() {
        //setState используется вместо forceUpdate. setState - асинхронная операция
        this.setState({
            editMode: true
        })
    };

    /*Второй способ через костыль - forceUpdate. Нужен, иначе не происходит ререндер после обновления стейта
        this.state.editMode = true;
        this.forceUpdate();
         */

    editModeOff() {
        this.setState({
            editMode: false
        });
    };

    render() {
        return (
            <div> Status:
                {!this.state.editMode &&
                    <span className={style.statusBlock}>{this.props.status}
                        {/*нужно байндить this, иначе функция не сработает*/}
                        <span onClick={this.editModeOn.bind(this)} className={style.editStatus}>&#128393;</span>
                    </span>
                }
                {this.state.editMode &&
                    <input
                        //когда уходим из фокуса инпута (нажимает на другое место)
                        onBlur={this.editModeOff.bind(this)}
                        //автофокус в поле ввода инпута
                        autoFocus={true}
                        value={this.props.status}></input>
                }
            </div>
        )
    }
};

export default ProfileStatus;