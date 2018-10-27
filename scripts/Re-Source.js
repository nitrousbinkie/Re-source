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
                                    Id: 1,
                                    Label: "Scheduling",
                                    State: "InProgress"
                                },
                                {
                                    Id: 2,
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
                                Id: 3,
                                Label: "CR12345 [Imp 1/2]",
                                State: "Complete"
                            }
                        ]
                    },
                    {
                        Tasks: [
                            {
                                Id: 4,
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
                                Id: 5,
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
                                Id: 6,
                                Label: "CR12345 [Test]",
                                State: "Planned"
                            }
                        ]
                    },
                    {
                        Tasks: [
                            {
                                Id: 7,
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
                        Id: 8,
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
                        Id: 9,
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
                Id: 10,
                Label: "CR57985",
                State: "Unplanned"
            }
        ]
    }

    console.log(config);
    $(".workArea").resourceview(config);

})