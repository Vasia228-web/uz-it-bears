export function useRanking() {
    return {
        rankings: [
            {
                id: 2,
                name: "Оксана Кодерка",
                type: "user",
                level: 20,
                points: 5100,
                projects: 25,
                avatar: "/user-avatar.jpg"
            },
            {
                id: 1,
                name: "Лісові Розробники",
                type: "team",
                level: 18,
                points: 4650,
                projects: 22,
                avatar: "/team-avatar.jpg"
            },
            {
                id: 3,
                name: "Марія Гірська",
                type: "user",
                level: 15,
                points: 3200,
                projects: 19,
                avatar: "/user-avatar.jpg"
            }
        ],

        friendsRankings: [
            {
                id: 2,
                name: "Оксана Кодерка",
                type: "user",
                level: 20,
                points: 5100,
                projects: 25,
                avatar: "/user-avatar.jpg"
            },
            {
                id: 3,
                name: "Марія Гірська",
                type: "user",
                level: 15,
                points: 3200,
                projects: 19,
                avatar: "/user-avatar.jpg"
            }
        ],

        loading: false,
        error: null,
        updateUserPoints: cy.stub(),
        refreshRankings: cy.stub(),
        pointsSystem: {}
    };
}
