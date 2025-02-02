import 'package:flutter/material.dart';
import 'package:portfolio_frontend/core/themes/main_theme.dart';
import 'package:portfolio_frontend/features/main_page/widget/nav_bar.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('images/bg_gradient.png'),
            fit: BoxFit.cover,
            alignment: Alignment.topCenter,
          ),
        ),
        child: Column(
          children: [
            // NavBar at the top
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 10.0),
              child: NavBar(),
            ),
            // Main content
            Expanded(
              child: Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: 200,
                      width: 300,
                      child: Stack(
                        children: [
                          Positioned(child: Text("Jake", 
                            style: TextStyle(fontSize: 90, 
                            color: MainTheme.lightBeige, 
                            fontFamily: 'Gruppo'))),
                          Positioned(
                            top: 80,
                            child: Text("Callcut", style: TextStyle(fontSize: 90, color: MainTheme.lightBeige, fontFamily: 'Gruppo'))),
                        ],
                      ),
                    ),
                    Image.asset('images/statue.png', opacity: const AlwaysStoppedAnimation<double>(0.13), height: 600,),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Software Developer\n& UX Designer', style: TextStyle(fontSize: 40, color: MainTheme.lightBeige, fontFamily: 'Gruppo')),
                        Row(
                          children: [
                            Image.asset("icons/location.png", width: 30, height: 30,),
                            Text('Edinburgh, Scotland', style: TextStyle(fontSize: 30, color: MainTheme.lightBeige, fontFamily: 'Gruppo')),                          
                          ],
                        )
                      ],
                    )
                  ],
                )
              ),
            ),
          ],
        ),
      ),
    );
  }

}