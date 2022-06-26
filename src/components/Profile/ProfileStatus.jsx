import React from 'react';
import style from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
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
        this.props.updateUserStatus(this.state.status);
    };

    //чтобы не байндить функцию в callback'е, можно использовать стрелочную функцию
    onUserStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    };

    componentDidUpdate(prevProps, prevState) {
//если в предыдущих пропсах статус был, который не равен статусу в текущих пропсах (изменился именно статус, из-за чего и срабатываем метод componentDidUpdate), тогда синхронизируем status в пропсах. Изначально status - пустая строка. Потом с сервера запрашиваем status пользователя и он сетается в state и приходит в компонент через пропсы
        if (prevProps.status !== this.props.status) {
    this.setState({
        status:this.props.status
    })
}
    };

    render() {
        return (
            <div> Status:
                {!this.state.editMode &&
                    <span className={style.statusBlock}>
                        {this.props.status || "This user hasn't set status"}
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
                        value={this.state.status}
                        onChange={this.onUserStatusChange}
                    />
                }
            </div>
        )
    }
};

export default ProfileStatus;