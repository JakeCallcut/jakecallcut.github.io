import 'package:flutter/material.dart';
import 'package:portfolio_frontend/core/themes/main_theme.dart';

class NavBar extends StatelessWidget {
  final double _mobileBreakpoint = 600;
  
  final TextStyle _menuStyle = TextStyle(
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
        return _buildMobileNav();
      },
    );
  }

  Widget _buildDesktopNav() {
    return Container(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: _buildMenuItems(),
            ),
          ),
          Divider(thickness: 1, color: MainTheme.lightBeige),
        ],
      ),
    );
  }

  Widget _buildMobileNav() {
    return Container(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                PopupMenuButton<String>(
                  icon: Icon(Icons.menu, color: MainTheme.lightBeige),
                  color: Colors.black87,
                  itemBuilder: (BuildContext context) {
                    return ['Home', 'About', 'Work', 'Contact', 'Inspiration']
                        .map((String choice) {
                      return PopupMenuItem<String>(
                        value: choice,
                        child: Text(choice, style: _menuStyle),
                      );
                    }).toList();
                  },
                  onSelected: (String value) {

                  },
                ),
              ],
            ),
          ),
          Divider(thickness: 1, color: MainTheme.lightBeige),
        ],
      ),
    );
  }

  List<Widget> _buildMenuItems() {
    return [
      Text('Home', style: _menuStyle),
      Text('About', style: _menuStyle),
      Text('Work', style: _menuStyle),
      Text('Contact', style: _menuStyle),
      Text('Inspiration', style: _menuStyle),
    ];
  }
}