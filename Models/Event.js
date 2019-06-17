export default class Event extends Component {

    user;
    eventName;
    eventDescription;
    startTime;
    endTime;
    location;

    constructor(user, eventName, eventDescription, startTime, endTime, location) {
        this.user = user;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }
}