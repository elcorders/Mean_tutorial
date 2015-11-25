
var app = angular.module('flapperNews', ['ui.router']);
app
//service
.factory('posts', [function () {
        var o = {
            posts: [
                {
                    title: "hello",
                    link: '',
                    upvotes: 0,
                    comments: [
                        { author: 'Joe', body: 'Cool Post #YOLO', upvotes: 0 },
                        { author: 'Bob', body: 'lorema ispum do sit amet #META', upvotes: 0 }
                    ]
                }
            ]
        };
        return o;
    }])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider , $urlRouterProvider) {

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })
        .state('posts', {
            url: '/posts/{id}', // route parameter
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });

        $urlRouterProvider.otherwise('home');
    }
])

//home controller
.controller('MainCtrl', [
    '$scope',
    'posts',
    function ($scope, posts){
        //$scope.test = 'Hello world!';        
        $scope.posts = posts.posts;
        
        $scope.addPost = function () {
            if (!$scope.title || $scope.title === "") { return;}
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    { author: 'Joe', body: 'Cool Post #YOLO', upvotes: 0 },
                    {author: 'Bob', body: 'lorema ispum do sit amet #META', upvotes: 0 }
                ]
            });
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1;
        }
    }
])

//posts controller
.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function ($scope, $stateParams, posts){

        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function () {
            console.log("fired");
            if (!$scope.body === "") { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };

        $scope.incrementUpvotes = function (comment) {
           comment.upvotes += 1;
        }
    }
])