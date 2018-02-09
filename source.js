var app = angular.module('app', []);
app.controller('ctrl', function($scope) {
    // Hypergeometric JS from http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html
    $scope.nn = 60; // 60 cards in deck
    $scope.n = 7;   // 7 cards in starting hand
    $scope.x = 0;
    
    $scope.brigette = 2;
    $scope.lele = 3;
    $scope.ball = 4;

    $scope.hyp = function(x, n, nn) {
        var b = 0, l = 0, ba = 0;
        if ($scope.brigette != "")
            b = parseInt($scope.brigette);
        
        if ($scope.lele != "" && $scope.brigette != "")
            l = parseInt($scope.lele);
        
        if ($scope.ball != "" && $scope.lele != "" && $scope.brigette != "")
            ba = parseInt($scope.ball);
        
        var m = b + l + ba;
        
        var nz, mz;
        // best to have n<m
        if (m < n) {
            nz = m;
            mz = n
        } else {
            nz = n;
            mz = m
        }
        var h=1;
        var s=1;
        var k=0;
        var i=0;
        while (i < x) {
            while (s > 1 && k < nz) {
                h = h * (1 - mz / (nn - k));
                s = s * (1 -mz / (nn - k));
                k = k + 1;
            }
            h = h * (nz - i) * (mz - i) / (i + 1) / (nn - nz - mz + i + 1);
            s = s + h;
            i = i + 1;
        }
        while (k < nz) {
            s = s * (1 - mz / (nn - k));
            k = k + 1;
        }
        return ((1 - s) * 100).toFixed(2);
    }
});
