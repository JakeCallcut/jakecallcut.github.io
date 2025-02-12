import 'package:flutter/material.dart';
import 'package:portfolio_frontend/core/themes/main_theme.dart';

class NavBar extends StatelessWidget {
  final double _mobileBreakpoint = 600;
  final VoidCallback onAboutPressed;
  final VoidCallback onHomePressed;

  const NavBar({
    super.key,
    required this.onAboutPressed,
    required this.onHomePressed,
  });

  static const TextStyle _menuStyle = TextStyle(
    fontFamily: 'Gruppo',
    fontSize: 20,
    color: MainTheme.lightBeige,
  );

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > _mobileBreakpoint) {
          return _buildDesktopNav();
        }
        return _buildMobileNav(context);
      },
    );
  }

  Widget _buildDesktopNav() {
    return Column(
      children: [
        Row(

          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextButton(
              onPressed: onHomePressed,
              child: Text('Home', style: _menuStyle),
            ),
            SizedBox(width: 20),
            TextButton(
              onPressed: onAboutPressed,
              child: Text('About', style: _menuStyle),
            ),
          ],
        ),
        Divider(color: MainTheme.lightBeige),
      ],
    );
  }

  Widget _buildMobileNav(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('JC', style: _menuStyle),
            IconButton(
              icon: Icon(Icons.menu, color: MainTheme.lightBeige),
              onPressed: () {
                showMenu(
                  context: context,
                  position: RelativeRect.fromLTRB(double.infinity, 0, 0, 0),
                  items: [
                    PopupMenuItem(
                      onTap: onHomePressed,
                      child: Text('Home', style: _menuStyle),
                    ),
                    PopupMenuItem(
                      onTap: onAboutPressed,
                      child: Text('About', style: _menuStyle),
                    ),
                  ],
                  color: Colors.black,
                );
              },
            ),
          ],
        ),
        Divider(color: MainTheme.lightBeige),
      ],
    );
  }
}