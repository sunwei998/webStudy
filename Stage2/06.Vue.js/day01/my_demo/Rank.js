let vm = new Vue({
    el: "#app",
    data() {
        return {
            titles: ['姓名', '数学', '语文', '英语', '地理', '历史', '总分'],
            list: [
                {
                    name: "肖枫",
                    score: [
                        {
                            math: 99,
                            chinese: 100,
                            english: 100,
                            geography: 99,
                            history: 98,
                        },
                    ],
                },

                {
                    name: "安澜",

                    score: [
                        {
                            math: 90,
                            chinese: 98,
                            english: 89,
                            geography: 96,
                            history: 100,
                        },
                    ],
                },

                {
                    name: "路小北",

                    score: [
                        {
                            math: 88,
                            chinese: 87,
                            english: 77,
                            geography: 86,
                            history: 78,
                        },
                    ],
                },

                {
                    name: "许巍",
                    score: [
                        {
                            math: 39,
                            chinese: 40,
                            english: 76,
                            geography: 90,
                            history: 59,
                        },
                    ],
                },
            ],
        };
    },
});