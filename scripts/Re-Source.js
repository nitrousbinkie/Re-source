$(function () {

    var config = {
        Users: [
            {
                Name: "James Sumner",
                Schedule:
                    [
                        {
                            Tasks: [
                                {
                                    Label: "Scheduling",
                                    State: "InProgress"
                                },
                                {
                                    Label: "CR11283",
                                    State: "Planned"
                                }
                            ]
                        }
                    ]
            },
            {
                Name: "Andres Martin",
                Schedule: [
                    {

                    },
                    {

                    },
                    {
                        Tasks: [
                            {
                                Label: "CR12345 [Imp 1/2]",
                                State: "Complete"
                            }
                        ]
                    },
                    {
                        Tasks: [
                            {
                                Label: "CR12345 [Imp 2/2]",
                                State: "Planned"
                            }
                        ]
                    }
                ]
            },
            {
                Name: "David Sarembock",
                Schedule: [
                    {},
                    {
                        Tasks: [
                            {
                                Label: "Test",
                                State: "Complete"
                            }
                        ]
                    }
                ]
            },
            {
                Name: "Kathryn Stewart",
                Schedule: []
            },
            {
                Name: "Jenni Phillips",
                Schedule: []
            },
            {
                Name: "Howard Whiley",
                Schedule: [
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {
                        Tasks: [
                            {
                                Label: "CR12345 [Test]",
                                State: "Planned"
                            }
                        ]
                    },
                    {
                        Tasks: [
                            {
                                Label: "CR12345 [Doc]",
                                State: "InProgress"
                            }
                        ]
                    },
                    {},
                    {},
                    {},
                    {},
                    {}
                ]
            }
        ],
        Events: [
            {},
            {},
            {
                Tasks: [
                    {
                        Label: "CallBar -November Release",
                        State: "Planned"
                    }
                ]
            },
            {},
            {},
            {},
            {},
            {},
            {
                Tasks: [
                    {
                        Label: "Security Review",
                        State: "Planned"
                    }
                ]
            },
            {},
            {},
            {},
            {},
            {}
        ],
        Unallocated: [
            {
                Label: "CR57985",
                State: "Unplanned"
            }
        ]
    }

    console.log(config);
    $(".workArea").resourceview(config);

})