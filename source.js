var app = angular.module('app', []);
app.controller('ctrl', function($scope) {
    // Hypergeometric JS from http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html
    $scope.nn = 60; // 60 cards in deck
    $scope.n = 7;   // 7 cards in starting hand
    $scope.x = 0;
    
    $scope.brigette = 2;
    $scope.lele = 3;
    $scope.ball = 4;
    
    $scope.compute = function(x, n, nn) {
        var odds = 1 - $scope.hyp(x, n, nn);
        // initial odds are the odds of having Brigette, Ultra Ball, or Tapu Lele-GX in starting hand
        
        odds -= (1 - $scope.hyp($scope.brigette, 6, 60));  
        // odds of prizing all Brigette
        
        if ($scope.lele > 1)
            odds -= ((1 - $scope.hyp($scope.lele, 7, 60)) * $scope.hyp($scope.lele - 1, 6, 60))
        // odds of starting Lele and prizing the other(s)
        
        return (100 * odds).toFixed(2);
        // return the odds in a percentage with floating point 2
    }

    $scope.hyp = function(x, n, nn) {
        var b = 0, l = 0, ba = 0;
        if ($scope.brigette != "")
            b = parseInt($scope.brigette);
        // if Brigette count is valid, set b (Brigette count) to user input
        // if it's not valid, b will stay equal to zero instead of trying to parseInt() ""
        
        if ($scope.lele != "" && $scope.brigette != "")
            l = parseInt($scope.lele);
        // if Lele count is valid, set l (Lele count) to user input
        // if it's not valid, l will stay equal to zero instead of trying to parseInt() ""
        
        if ($scope.ball != "" && $scope.lele != "" && $scope.brigette != "")
            ba = parseInt($scope.ball);
        // if Ultra Ball count is valid, set ba (Ultra Ball count) to user input
        // if it's not valid, ba will stay equal to zero instead of trying to parseInt() ""
        
        var m = b + l + ba;
        // m, the total valid sample size, is equal to the sum of the Brigette count, Lele count, and Ultra Ball count
        
        // The rest of this algorithm is from https://gist.github.com/trevnorris/c39ac96740842e05303f
        // implementation found at http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html
        
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
        return s;
    }
});
