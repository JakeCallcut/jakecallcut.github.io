import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget{
  final double _mobileBreakpoint = 600;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > _mobileBreakpoint) {
          return _buildDesktopAbout();
        }
        return _buildMobileAbout();
      },
    );
  }

  Widget _buildDesktopAbout() { return Placeholder(); }
  Widget _buildMobileAbout() { return Placeholder(); }
}