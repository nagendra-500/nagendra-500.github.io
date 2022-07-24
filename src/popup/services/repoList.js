import moment from 'moment';
export default {
  data() {
    return {
      count: 0,
      fields: [
        {
          key: 'gravatar',
          label: 'Gravatar',
        },
        {
          key: 'owner_name',
          label: 'Name',
        },
        {
          key: 'repo_name',
          label: 'Repository Name',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'stars_count',
          label: 'starred count',
        },
        {
          key: 'open_issues_count',
          label: 'Open issues',
        },
        {
          key: 'repo_url',
          label: 'Repository Link',
        },
      ],
    };
  },
  async mounted() {
    var currentDate = new Date();
    var currentWeekDay = currentDate.getDay();
    var lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
    var ws = new Date(new Date(currentDate).setDate(currentDate.getDate() - lessDays));
    var we = new Date(new Date(ws).setDate(ws.getDate() + 6));
    this.defaultWeekStart = this.calendarFormat(ws);
    this.defaultWeekEnd = this.calendarFormat(we);
    this.weekStart = this.dbFormat(ws);
    this.weekEnd = this.dbFormat(we);
    this.range1 = [
      new Date(parseInt(this.defaultWeekStart.split('-')[0]), parseInt(this.defaultWeekStart.split('-')[1]), parseInt(this.defaultWeekStart.split('-')[2])),
      new Date(parseInt(this.defaultWeekEnd.split('-')[0]), parseInt(this.defaultWeekEnd.split('-')[1]), parseInt(this.defaultWeekEnd.split('-')[2])),
    ];
  },
  methods: {
    // Disable future dates
    disabledBeforeTodayAndAfterAWeek(date) {
      return date > new Date(parseInt(this.defaultWeekEnd.split('-')[0]), parseInt(this.defaultWeekEnd.split('-')[1]), parseInt(this.defaultWeekEnd.split('-')[2]));
    },
    // List the event while change the calendar
    onChangeDate(date) {
      var fromDate = new Date(date[0]); // Current date of week
      this.weekStart = this.dbToCalendarFormat(fromDate);
      var EndDate = new Date(date[1]); // Current date of week
      this.weekEnd = this.dbToCalendarFormat(EndDate);
      this.myProvider(window.ctx, window.callback);
    },
    // Recipient Details
    recipientFormat(item) {
      return item.split(',');
    },
    // Date format
    sentDateFormat(date) {
      return moment
        .utc(date.replace(/(\d+)(st|nd|rd|th)/, '$1'))
        .local()
        .format('DD-MMM-YYYY, hh:mm A');
    },
    // Modify the Date based on calendar
    calendarFormat(date) {
      var dateFormat = date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() : '0' + date.getMonth()) + '-' + date.getDate();
      return dateFormat;
    },

    // Modify the Date based on DB
    dbFormat(date) {
      var dateFormat = date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + date.getDate();
      return dateFormat;
    },

    // Modify the date from calendar format to DB
    dbToCalendarFormat(date) {
      return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() >= 9 ? new Date(date).getMonth() + 1 : '0' + (new Date(date).getMonth() + 1)) + '-' + (new Date(date).getDate(date) >= 10 ? new Date(date).getDate() : '0' + new Date(date).getDate());
    },
  },
};
