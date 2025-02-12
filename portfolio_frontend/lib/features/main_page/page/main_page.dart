import 'package:flutter/material.dart';
import 'package:portfolio_frontend/core/themes/main_theme.dart';
import 'package:portfolio_frontend/features/main_page/widget/about_page.dart';
import 'package:portfolio_frontend/features/main_page/widget/nav_bar.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final PageController _pageController = PageController();
  final double _mobileBreakpoint = 900.0;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/bg_gradient.png'),
            fit: BoxFit.cover,
            alignment: Alignment.topCenter,
          ),
        ),
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
              child: NavBar(
                onHomePressed: () {
                  _pageController.animateToPage(
                    0,
                    duration: Duration(milliseconds: 500),
                    curve: Curves.easeInOut,
                  );
                },
                onAboutPressed: () {
                  _pageController.animateToPage(
                    1,
                    duration: Duration(milliseconds: 500),
                    curve: Curves.easeInOut,
                  );
                },
              ),
            ),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                scrollDirection: Axis.vertical,
                physics: const PageScrollPhysics(),
                itemCount: 2,
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return LayoutBuilder(
                      builder: (context, constraints) {
                        if (constraints.maxWidth > _mobileBreakpoint) {
                          return _buildDesktopLayout();
                        }
                        return _buildMobileLayout();
                      },
                    );
                  } else {
                    return AboutPage();
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDesktopLayout() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenWidth = constraints.maxWidth;
        
        return Stack(
          fit: StackFit.expand,
          alignment: Alignment.center,
          children: [
            // Centered statue
            Positioned.fill(
              child: Center(
                child: Image.asset(
                  'assets/images/statue.png',
                  opacity: const AlwaysStoppedAnimation<double>(0.13),
                  height: 600,
                  fit: BoxFit.contain,
                ),
              ),
            ),
            // Content overlay
            Padding(
              padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.1),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _buildNameSection(),
                  _buildInfoSection(),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildNameSection() {
    return SizedBox(
      height: 200,
      width: 300,
      child: Stack(
        children: [
          const Positioned(
            top: 0,
            left: 0,
            child: Text(
              "Jake",
              style: TextStyle(
                fontSize: 90,
                color: MainTheme.lightBeige,
                fontFamily: 'Gruppo'
              )
            ),
          ),
          const Positioned(
            top: 80,
            left: 0,
            child: Text(
              "Callcut",
              style: TextStyle(
                fontSize: 90,
                color: MainTheme.lightBeige,
                fontFamily: 'Gruppo'
              )
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoSection() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Software Developer\n& UX Designer',
          style: TextStyle(
            fontSize: 40,
            color: MainTheme.lightBeige,
            fontFamily: 'Gruppo'
          )
        ),
        const SizedBox(height: 20),
        Row(
          children: [
            Image.asset(
              "assets/icons/location.png",
              width: 30,
              height: 30,
            ),
            const SizedBox(width: 10),
            const Text(
              'Edinburgh, Scotland',
              style: TextStyle(
                fontSize: 30,
                color: MainTheme.lightBeige,
                fontFamily: 'Gruppo'
              )
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildMobileLayout() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Jake",
              style: TextStyle(
                fontSize: 70,
                color: MainTheme.lightBeige,
                fontFamily: 'Gruppo'
              )
            ),
            Text(
              "Callcut",
              style: TextStyle(
                fontSize: 70,
                color: MainTheme.lightBeige,
                fontFamily: 'Gruppo'
              )
            ),
            SizedBox(height: 40),
            Text(
              'Software Developer\n& UX Designer',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 32,
                color: MainTheme.lightBeige,
                fontFamily: 'Gruppo'
              )
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  "assets/icons/location.png",
                  width: 24,
                  height: 24,
                ),
                SizedBox(width: 8),
                Text(
                  'Edinburgh, Scotland',
                  style: TextStyle(
                    fontSize: 24,
                    color: MainTheme.lightBeige,
                    fontFamily: 'Gruppo'
                  )
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}