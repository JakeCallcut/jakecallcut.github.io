import 'package:flutter/material.dart';
import 'package:portfolio_frontend/features/main_page/page/main_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portfolio | Jake Callcut',
      home: MainPage(),
    );
  }
}
