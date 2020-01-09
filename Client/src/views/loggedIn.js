import * as React from 'react';
import { Component } from 'react';
import ProfileSummary from '../components/profile/ProfileSummary/ProfileSummary';
import EventList from '../components/event/EventList/EventList';


export default class LoggedIn extends Component {
    render() {
        return (
            <div>
            <ProfileSummary />
            <EventList />
            </div>
        )
    }
}