<!DOCTYPE html>
<html ng-app="myApp"> 
      <head> 
            <base href="">
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="_token" content="{{ csrf_token() }}"/>
      <title>Caffe-App</title>
      <link href="<?= asset('/css/main.css') ?>" rel="stylesheet">
            <link href="<?= asset('/css/combined.css') ?>" rel="stylesheet">
            <link href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/trix/0.9.2/trix.css">
    <link rel="stylesheet" href="https://rawgit.com/tamtakoe/oi.select/master/dist/select.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.0/paper/bootstrap.min.css">
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
      <script src="<?= asset('/app/lib/angular/angular.min.js') ?>"></script>
      <script src="<?= asset('/app/lib/angular/angular-route.min.js') ?>"></script>
      <script src="https://cdn.jsdelivr.net/ngstorage/0.3.6/ngStorage.min.js"></script>
      <script src="<?= asset('/app/app.js') ?>"></script>
      <script src="<?= asset('/app/controller/mainController.js') ?>"></script>
<script data-require="angular-resource@1.4.3" data-semver="1.4.3" src="https://code.angularjs.org/1.4.3/angular-resource.js"></script>
    <script src="//rawgit.com/tamtakoe/oi.select/master/dist/select-tpls.js"></script>
            <script src="<?= asset('/app/controller/loginController.js') ?>"></script>
                  <script src="<?= asset('/app/controller/questionController.js') ?>"></script>
      <script src="<?= asset('/app/filter/customeFilter.js') ?>"></script>
      <script src="<?= asset('/app/directives/customeDirective.js') ?>"></script>
      <script src="<?= asset('/app/services/authServices.js') ?>"></script>
       <script src="<?= asset('/app/services/SessionService.js') ?>"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/trix/0.9.2/trix.js"></script>
<script src="https://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.10.0.js" type="text/javascript"></script>
      </head>
      <body ng-controller="maincontroller" >
    <div class="navbar navbar-default navbar-static-top">
  <div class="container">
    <ul class="nav navbar-nav">
      <a href="#/welcome" class="navbar-brand"><i class="ion-images"></i>Laravel</a>
      <li ng-if="isUserLoggedIn()"><a href="#/home">Home</a></li>
      <li ng-if="isUserLoggedIn()"><a href="#/ask">Ask a Question </a></li>

       <li class="dropdown" ng-if="isUserLoggedIn()">
     <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">mangal <span class="caret"></span>
                 </a>
                     <ul class="dropdown-menu" role="menu">
                  <li><a href="" ng-click="userLogout()"></i>Logout</a></li>
                            </ul>
                        </li>
 

       <!--  <li ng-if="isUserLoggedIn()"><a ng-click="userLogout()" href="">Logout</a></li>  -->
      <li ng-if="!isUserLoggedIn()"><a href="#/login">Log in</a></li>
      <li ng-if="!isUserLoggedIn()"><a href="#/signup">Sign up</a></li>
  
    </ul>

  </div>
</div>
<!--middle section -->
<section id="middle">
        <div class="main">
            <div class="main-inner">
                <div class="container">
                    <div class="row">
              
                   <ng-view></ng-view>
              
            </div>
        </div>
          </div>
          </div>
    </section>
<!--middle section end -->


 <section id="bottom">
    <div class="extra">
        <div class="extra-inner">
            <div class="container">    
                <div id="fc">
                    <div class="footerLinks">
                        <div class="footer-nav main">
                            <span class="footer-highlight">Mangal Developer</span>
                            -
                            <a target="_blank" href="#">Mobilyte India Tech Pvt. Ltd.</a>
                            -
                            <a target="_blank" href="#">Community USA</a>
                        </div>
                        <div class="footer-nav">

         <a href="#/home">Home</a>&nbsp;&nbsp;

    <a ng-if="isUserLoggedIn()" href="#/ask">Ask a Question </a>&nbsp;&nbsp;&nbsp;

    <a   ng-if="!isUserLoggedIn()" href="#/login">Log in</a>&nbsp;&nbsp;

    <a   ng-if="!isUserLoggedIn()" href="#/signup">Sign up</a>&nbsp;&nbsp;

                  

                        </div>
                    </div>
                </div>
                <div class="this-is-squarespace">
                    <p>
                        <span class="before">Established 2016</span>
                        <a class="ion-images" href="#"> Laravel </a>
                       
                    </p>
                    <a href="#">Powered by Mangal Singh</a>
                </div>

            </div> <!-- /container -->

        </div> <!-- /extra-inner -->
    </div> <!-- /extra -->
</section>
      
      </body>
      </html>
